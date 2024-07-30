from flask_sqlalchemy import SQLAlchemy
from flask import jsonify

db = SQLAlchemy()

class Flight(db.Model):
    __tablenam__ = 'flight'
    id = db.Column(db.Integer, db.Sequence('flight_id') ,primary_key=True)
    from_city = db.Column(db.String, nullable=False)
    to_city = db.Column(db.String, nullable=False)
    status = db.Column(db.String, nullable=False)

    def __repr__(self):
        return f'<Flight {self.flight_id}>'
    
    @classmethod
    def filter(cls, *criterion):
        db_query = db.session.query(cls)
        return db_query.filter(*criterion)
    
    @classmethod
    def get_by_id(cls, _id):
        return cls.filter(cls.id == _id).first()
    
    @classmethod
    def insert_new_flight(cls, flight_new: 'Flight'):
        db.session.add(flight_new)
        db.session.commit()
        db.session.flush()
        
    @classmethod
    def update_status(cls, _id, status_new):
        flight = cls.get_by_id(_id)
        flight.status = status_new
        db.session.commit()
        db.session.flush()
        return flight
    
    @classmethod
    def get_all_flights(cls):
        flights = cls.query.all()
        flightArr = []
        for flight in flights:
            temp_flight = {
                "id":flight.id,
                "from_city":flight.from_city,
                "to_city":flight.to_city,
                "status":flight.status
            }
            flightArr.append(temp_flight)
        return flightArr
        

class Booking(db.Model):
    __tablenam__ = 'booking'
    id = db.Column(db.Integer, primary_key=True)
    flight_id = db.Column(db.Integer, db.ForeignKey('flight.id'), nullable=False)

    def __repr__(self):
        return f'<Booking {self.id}>'
    
    @classmethod
    def addBooking(cls, booking:'Booking'):
        db.session.add(booking)
        db.session.commit()
        db.session.flush()
    
    @classmethod
    def getBookings(cls):
        bookings = cls.query.all()
        bookingArr = []
        if(len(bookings) > 0):
            for booking in bookings:
                bookingArr.append(booking.flight_id)
            return bookingArr
        
        return []
            