def add_time(start, duration, weekday = None):
	day = 0
	update_hour = 0
	hour = start.split(":")[0]
	minute = start.split(":")[1].split(" ")[0]
	period = start.split(":")[1].split(" ")[1]

	add_hour = duration.split(":")[0]
	add_minute = duration.split(":")[1]

	update_minute = int(minute) + int(add_minute)
	#handle minute
	#if minutes > 60, hour += 1
	if update_minute >= 60:
		update_hour += 1
		update_minute -= 60
	#two digits
	if update_minute < 10:
		update_minute = "0" + str(update_minute)
	else:
		update_minute = str(update_minute)

	#handle hour
	update_hour += int(hour) + int(add_hour)
	#AM changes to PM after 12 hours, vice versa
	#if PM changes to AM, day += 1
	while update_hour >= 12:
		if period == "AM":
			period = "PM"
		else:
			period = "AM"
			day += 1
		update_hour -= 12
  #test requires 12 instead of 0
	if update_hour == 0:
		update_hour = 12
	#handle string
	update_time = str(update_hour) +":" + update_minute + " " + period
	if day == 0:
		new_time = update_time
	elif day == 1:
		new_time = update_time + " (next day)"
	else:
		new_time = update_time + " (" + str(day) + " days later)"

	#handle weekday
	if weekday:
		weekday = weekday.lower().title()
		weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
		update_weekday_index = weekdays.index(weekday) + day % 7
		if update_weekday_index >= 7:
			update_weekday_index -= 7
		update_weekday = weekdays[update_weekday_index]
    #combine weekday with the original string
		new_time_list = new_time.split("M")
		new_time_list.insert(1, "M, " + update_weekday)
		new_time = "".join(new_time_list)
	return new_time
print(add_time("3:55 AM", "48:00"))
