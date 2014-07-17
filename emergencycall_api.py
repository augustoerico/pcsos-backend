import endpoints

from google.appengine.ext import ndb
from protorpc import remote

from endpoints_proto_datastore.ndb import EndpointsModel

package = 'Call'

WEB_CLIENT_ID = '392257250979-0q3b7q6fddn9eoin1bdu8oujiudbs0si.apps.googleusercontent.com'
ANDROID_CLIENT_ID = 'replace this with your Android client ID'
IOS_CLIENT_ID = 'replace this with your iOS client ID'
ANDROID_AUDIENCE = WEB_CLIENT_ID

class EmergencyCall(EndpointsModel):

    victim = ndb.StringProperty(required=True)
    message = ndb.StringProperty()

@endpoints.api(name='emergencycalls', version='v3',
                allowed_client_ids=[WEB_CLIENT_ID,
                                   ANDROID_CLIENT_ID,          
                                   IOS_CLIENT_ID,
                                   endpoints.API_EXPLORER_CLIENT_ID],
                audiences=[ANDROID_AUDIENCE],
                description='API for emergency calls')
class EmergencyCallApi(remote.Service):

    @EmergencyCall.method(name='emergencycall.insert',
                          path='emergencycall')
    def insert_emergencycall(self, emergencycall):
        emergencycall.put()
        return emergencycall

    @EmergencyCall.query_method(name='emergencycall.list',
                          path='emergencycalls')
    def list_emergencycall(self, query):
        return query

application = endpoints.api_server([EmergencyCallApi])
