import os


def print_board(_list):
    """
    :param _list: list of current board values
    """
    os.system('clear')
    print()
    print('  {}   |   {}   |   {}'.format(_list[0], _list[1], _list[2]))
    print('---------------------')
    print('  {}   |   {}   |   {}'.format(_list[3], _list[4], _list[5]))
    print('---------------------')
    print('  {}   |   {}   |   {}'.format(_list[6], _list[7], _list[8]))
    print()


def player_selection(_list, _player):
    """
    :param _list: list of current board values
    :param _player: X's or O's
    :return _list: the updated list of board values
    """
    _cell = None
    while True:
        try:
            _cell = int(input('Player {}; enter the cell you want: '.format(_player)))
            break
        except:
            continue
    for i, each in enumerate(_list):
        if each == _cell:
            _list[i] = _player
            break
    return _list


def check_solution(_list, _player):
    """
    :param _list: list of current board values
    :param _player: X's or O's
    :return : Boolean value of whether of the game has been solved
    """
    win = [[0, 1, 2], [0, 3, 6], [6, 7, 8], [2, 5, 8], [0, 4, 8], [6, 4, 2], [3, 4, 5], [1, 4, 7]]
    for i, each in enumerate(win):
        if _list[win[i][0]] == _player and _list[win[i][1]] == _player and _list[win[i][2]] == _player:
            return True
    return False


def main():
    game_list = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    game_over = False
    turn = 0
    player = 'X'

    print_board(game_list)

    while (not game_over) and (turn <= 8):
        if turn % 2 == 0:
            player = 'X'
        else:
            player = 'O'

        game_list = player_selection(game_list, player)
        print_board(game_list)

        game_over = check_solution(game_list, player)
        turn += 1
        print(turn)

    if game_over:
        print('Game over. {} wins!'.format(player))
    else:
        print('Game over. It was a tie.')

if __name__ == "__main__":
    main()
