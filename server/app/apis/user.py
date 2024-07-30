from flask import Blueprint, request
from app.models import Booking, Flight
from app import socketio, client

user_routes = Blueprint('user_routes', __name__)

@user_routes.route("/bookFlight", methods=['POST'])
def bookFlight():
    booking = Booking(flight_id = request.json['id'])
    print()
    Booking.addBooking(booking)
    flight = Flight.get_by_id(request.json['id'])
    socketio.emit('flight_booked', {
            "id":flight.id,
            "from_city":flight.from_city,
            "to_city":flight.to_city,   
            "status":flight.status,
            "booked":True       
        })
    client.messages.create(
        from_='twilio_contact_number',
        body=f"Hello user, Booking confirmed for flight travelling from {flight.from_city} to {flight.to_city}",
        to='"receiver_contact_number'
    )
    return {
        "status":True,
        "flight":{
            "id":flight.id,
            "from_city":flight.from_city,
            "to_city":flight.to_city,
            "status":flight.status
        }
    }

@user_routes.route("/flights", methods=['GET'])
def get_flights():
    flights = Flight().get_all_flights()
    newFlights = []
    bookings = Booking().getBookings()
    for flight in flights:
        if flight['id'] in bookings:
            flight['booked'] = True
        else:
            flight['booked'] = False
        newFlights.append(flight)
    return ({
        "status":True,
        "flights":newFlights
    })