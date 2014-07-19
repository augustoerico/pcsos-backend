import endpoints

from google.appengine.ext import ndb
from protorpc import remote

from endpoints_proto_datastore.ndb import EndpointsModel

package = 'Chamada'

WEB_CLIENT_ID = '392257250979-0q3b7q6fddn9eoin1bdu8oujiudbs0si.apps.googleusercontent.com'
ANDROID_CLIENT_ID = 'replace this with your Android client ID'
ANDROID_AUDIENCE = WEB_CLIENT_ID

class Chamada(EndpointsModel):

    vitima = ndb.UserProperty()
    dataHorario = ndb.DateTimeProperty(auto_now_add=True)
    local = ndb.GeoPtProperty()

@endpoints.api(name='chamadas', version='v1',
                allowed_client_ids=[WEB_CLIENT_ID,
                                   ANDROID_CLIENT_ID,
                                   endpoints.API_EXPLORER_CLIENT_ID],
                audiences=[ANDROID_AUDIENCE],
                description='API para chamadas de emergencia')
class ChamadaApi(remote.Service):

    @Chamada.method(user_required=True,
                    name='chamada.insert',
                    path='chamada')
    def insertChamada(self, chamada):

        Chamada.vitima = endpoints.get_current_user();
        chamada.put()
        return chamada

    @Chamada.query_method(query_fields=('local'),
                          name='chamada.list',
                          path='chamadas')
    def listChamada(self, query):
        return query

application = endpoints.api_server([ChamadaApi])
