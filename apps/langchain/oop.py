class Car:
    def __init__(self, name, color):
        self.name = name
        self.color = color
        

    def drive(self):
        print("Driving", self.name, self.color, "car")

    def stop(self):
        print("Stopping", self.name, self.color, "car")
        
Car("BMW", "red").drive()