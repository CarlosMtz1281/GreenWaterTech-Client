@app.route('/api/getUser', methods=['GET'])
def get_user():
    user = session['user']
    response = getUserInfo(user)
    return response