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

userGlobal = ""

#Funciones para cambiar base de datos





#Funciones para obtener los datos de la base de datos
def getUserInfo(user):
    data = db.reference(f'Users/{user}')
    userGlobal = user
    return data.get()

def getCampos(campo):
    data = db.reference(f'Users/{userGlobal}/{campo}')
    return data.get()

def getCuadrantes(campo, cuadrante):
    data = db.reference(f'User/{userGlobal}/{campo}/{cuadrante}')
    return data.get()


#Pruebas
data = getCampos('-NizbbRQkf0AqfSdZIfv', 'campo1')
print(data)

print("\n")

data2 = getUserInfo('-NizbbRQkf0AqfSdZIfv')
print(data2)