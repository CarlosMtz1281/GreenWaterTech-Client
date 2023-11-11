import firebase_admin
from firebase_admin import credentials, db

## Acceder a la base de datos:
#Recuperar las credenciales del firebase
creds = credentials.Certificate('serviceAccCreds.json')

#link de la base de datos
url = 'https://greenwatertech-572bc-default-rtdb.firebaseio.com/'

#Iniciar la app con los permisos de la cuenta
firebase_admin.initialize_app(creds, {
    'databaseURL': url #Aqui va el url del firebase que tiene toda la info general
})

#Funciones para obtener los datos de la base de datos
def getCampos(user, campo):
    data = db.reference(f'Users/{user}/{campo}')
    return data.get()

def getCuadrantes(user, campo, cuadrante):
    data = db.reference(f'User/{user}/{campo}/{cuadrante}')
    return data.get()

data = getCampos('-NizbbRQkf0AqfSdZIfv', 'campo1')
print(data)