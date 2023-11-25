import firebase_admin
from firebase_admin import credentials, db


if not firebase_admin._apps:
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
def getUserInfo(user):
    data = db.reference(f'Users/{user}')
    return data.get()

def getCampos(user, campo):
    data = db.reference(f'Users/{user}/{campo}')
    return data.get()

def getCuadrantes(user, campo, cuadrante):
    data = db.reference(f'User/{user}/{campo}/{cuadrante}')
    return data.get()

#Funciones para cambiar base de datos
def updateUser(user, userNew):
    #Cambiar nombre user
    refUser = db.reference(f"Users/{user}")
    data = refUser.get() #Guardr la info 
    refUserUpdated = db.reference(f"Users/{userNew}")
    refUserUpdated.set(data) #Reescribir la info en la nueva ruta
    refUser.delete() #Borrar la anterior

def updateCampo(user, campo, campoNew):
    #Cambiar nombre campo
    campo = db.reference(f"Users/{user}/{campo}")
    campo.update(
        {'name': campoNew}
    )

def updateCuadrante(user, campo, cuadrante, cuadranteNew):
    cuadrante = db.reference(f"Users/{user}/{campo}/{cuadrante}")
    data = cuadrante.get()
    cuadranteUpdated = db.reference(f"Users/{user}/{campo}/{cuadranteNew}")
    cuadranteUpdated.set(data)
    cuadrante.delete()
    

def updateCuadranteInfo(user, campo, cuadrante, planta):
    campo = db.reference(f"Users/{user}/{campo}/{cuadrante}")
    planta = campo.child(planta)
