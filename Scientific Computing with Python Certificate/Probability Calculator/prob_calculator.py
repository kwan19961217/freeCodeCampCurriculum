import copy
import random
# Consider using the modules imported above.

class Hat:
	def __init__(self, **kwargs):
		self.contents = []
		self.drawn = []
		for key, value in kwargs.items():
			for n in range(value):
				self.contents.append(key)

	def draw(self, number):
		if number >= len(self.contents):
			self.drawn = self.contents
		else:
			while number > 0:
				x = random.choice(self.contents)
				self.contents.remove(x)
				self.drawn.append(x)
				number -= 1
		return self.drawn

def experiment(hat, expected_balls, num_balls_drawn, num_experiments):
	expected_balls_list = []
	success = 0
	test = 0
	for key, value in expected_balls.items():
			for n in range(value):
				expected_balls_list.append(key)
	expected_balls_list.sort()
	while test < num_experiments:
		copied_hat = copy.deepcopy(hat)
		clean_drawn = sorted(copied_hat.draw(num_balls_drawn))
		if compare(expected_balls_list, clean_drawn):
			success += 1
		test += 1
	return success / num_experiments

def compare(expected_balls_list, clean_drawn):
	for i in expected_balls_list:
		for j in clean_drawn:
			if i == j:
				clean_drawn.remove(j)
				break
			elif j == clean_drawn[-1]:
				return False
	return True

