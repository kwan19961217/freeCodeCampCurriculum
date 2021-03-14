import re
def arithmetic_arranger(problems, ans = False):
  if len(problems) > 5:
    return ("Error: Too many problems.")
  operators = []
  tops = []
  bottoms = []
  spaced_tops = []
  spaced_bottoms = []
  dashes = []
  i = 0
  for problem in problems:
      if re.search("[+]", problem):
        x = problem.split("+")
        if (len(x[0].strip())) > 4 or (len(x[1].strip())) > 4:
          return ("Error: Numbers cannot be more than four digits.")
        elif (re.search("\D",x[0].strip())):
          return ("Error: Numbers must only contain digits.")
        elif (re.search("\D",x[1].strip())):
          return ("Error: Numbers must only contain digits.")
        tops.append(x[0].strip())
        bottoms.append(x[1].strip())
        operators.append("+")
      elif re.search("[-]", problem):
        x = problem.split("-")
        if (len(x[0].strip())) > 4 or (len(x[1].strip())) > 4:
          return ("Error: Numbers cannot be more than four digits.")
        elif (re.search("\D",x[0].strip())):
          return ("Error: Numbers must only contain digits.")
        elif (re.search("\D",x[1].strip())):
          return ("Error: Numbers must only contain digits.")
        tops.append(x[0].strip())
        bottoms.append(x[1].strip())
        operators.append("-")
      elif re.search("[*]", problem) or re.search("[/]", problem):
        return ("Error: Operator must be '+' or '-'.")

  for top in tops:
    bottom = bottoms[i]
    operator = operators[i]
    if len(top) > len(bottom):
      x = operator + " " * (len(top) - len(bottom) + 1) + bottom
      spaced_tops.append("  " + top)
      spaced_bottoms.append(x)
    elif len(top) < len(bottom):
      x = " " * (len(bottom) - len(top) + 2) + top
      spaced_tops.append(x)
      spaced_bottoms.append(operator + " " + bottom)
    else:
      spaced_tops.append("  " + top)
      spaced_bottoms.append(operator + " " + bottom)
    i += 1

  for char in spaced_bottoms:
    dashes.append("-" * len(char))

  x = '    '.join(spaced_tops)
  y = '    '.join(spaced_bottoms)
  z = '    '.join(dashes)

  arranged_problems = f'{x}\n{y}\n{z}'
  if ans:
    answers = []
    i = 0
    for char in dashes:
      answer = eval(problems[i])
      answer = " " * (len(char) - len(str(answer))) + str(answer)
      answers.append(answer)
      i += 1
    a = '    '.join(answers)
    arranged_problems = f'{x}\n{y}\n{z}\n{a}'
  return arranged_problems
