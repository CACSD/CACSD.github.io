import random
    

def make_username():
    """
    :param None:  
    :return name: 
    creates a username 
    """
    first_name = (input('What is your first name? ')).lower()
    middle_name = (input('What is the first initial of your middle name? ')).lower()
    last_name = (input('What is your last name? ')).lower()
    
    num1 = random.randint(0, 9)
    num2 = random.randint(0, 9)
    name = ('{}{}{}{}{}'.format(last_name, first_name[0], middle_name, num1, num2))
    return name


def make_password(_theme, _length):
    """
    :param _theme:
    :param _length:
    :return word: 
    creates a password for the user
    """
    words = []
    temp = open('{}.txt'.format(_theme), 'r')
    for each in temp: 
        words.append(each.replace('\n', ''))
    
    while True:
            i = random.randint(1, len(words))
            word = words[i]
            if len(word) > _length:
                continue
            else:
                break
            
    j = len(word)
    while j < _length:
        word += str(random.randint(1, 9))
        j += 1
    
    return word
  

def main():
    username = make_username()
    
    while True:
        try:
            length = int(input('Passwords can be between 4 and 4 characters.\nHow long do you want your password to be? '))
        except:
            continue
        if 4 <= length <= 14:
            break
    
    while True:
        try:
            theme = input('What theme would you like? (food, sports, animals, latin): ')
        except:
            continue
        if theme == 'food':
            break
        if theme == 'sports':
            break
        if theme == 'animals':
            break
        if theme == 'latin':
            break
    password = make_password(theme, length)
    
    print('Your username is: {}'.format(username))
    print('Your password is: {}'.format(password))


main()
