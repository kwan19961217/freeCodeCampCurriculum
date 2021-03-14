class Rectangle:
	width = 0
	height = 0
	def __init__(self, width, height):
		self.width = width
		self.height = height
	def __str__(self):
		return("Rectangle(width={width}, height={height})".format(width=self.width, height=self.height))
	def set_width(self, width):
		self.width = width
	def set_height(self, height):
		self.height = height
	def get_area(self):
		return self.width * self.height
	def get_perimeter(self):
		return (self.width + self.height) * 2
	def get_diagonal(self):
		return (self.width ** 2 + self.height ** 2) ** .5
	def get_picture(self):
		if self.height > 50 or self.width > 50:
			return ("Too big for picture.")
		else:
			#picture = ""
			#picture += "*" * self.width
			#if self.height > 2:
			#	for h_length in range(self.height - 2):
			#		picture += "\n*" + " " * (self.width - 2)+ "*"
			#picture += "\n" + "*" * self.width
			#return picture
			picture = ""
			for i in range(self.height):
				for j in range(self.width):
					picture += "*"
				picture += "\n"
			return picture
	def get_amount_inside(self, other):
		return int(self.width / other.width) * int(self.height / other.height)

class Square(Rectangle):
	def __init__(self, length):
		self.width = length
		self.height = length
	def __str__(self):
		return ("Square(side={length})".format(length=self.width))
	def set_side(self, length):
		self.width = length
		self.height = length
	def set_width(self, width):
		self.width = width
		self.height = width
	def set_height(self, height):
		self.height = height
		self.width = height
