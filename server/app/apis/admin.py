from flask import Blueprint, request, jsonify, make_response
from app.models import Flight
from app import socketio
from app import client

admin_routes = Blueprint('admin_routes', __name__)

@admin_routes.route("/addFlight", methods=['POST'])
def add_flight():
    flight_instance = Flight(from_city= request.json['from_city'], to_city= request.json['to_city'],status=request.json['status'])
    Flight().insert_new_flight(flight_new=flight_instance)    
    return {
        "status":True,
        "msg":"New flight added",
        "flight":{
            "id":flight_instance.id,
            "from_city":flight_instance.from_city,
            "to_city":flight_instance.to_city,
            "status":flight_instance.status
        }
    }
    
@admin_routes.route("/flights", methods=['GET'])
def get_flight():
    flights = Flight().get_all_flights()
    response = make_response({
        "status":True,
        "flights":flights
    })
    return response 
        
@admin_routes.route("/updateFlight", methods=['POST'])
def update_status():
    _id = request.json['id']
    new_status = request.json['status']
    Flight().update_status(_id, new_status)
    flight = Flight().get_by_id(_id)
    socketio.emit('flight_status_updated', {
                "id":flight.id,
                "from_city":flight.from_city,
                "to_city":flight.to_city,
                "status":flight.status
            })
    client.messages.create(
        from_='sender_contact',
        body=f"Hello user, status of flight travelling from {flight.from_city} to {flight.to_city} is updated as follows, {flight.status}",
        to='receiver_number'
    )
    return {
        "id":flight.id,
        "from_city":flight.from_city,
        "to_city":flight.to_city,
        "status":flight.status
    }
    