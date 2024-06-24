import RingCentral from '@rc-ex/core';
import WebSocketExtension from '@rc-ex/ws';

const rc = new RingCentral({
  clientId: process.env.RINGCENTRAL_CLIENT_ID!,
  clientSecret: process.env.RINGCENTRAL_CLIENT_SECRET!,
  server: process.env.RINGCENTRAL_SERVER_URL!,
});

const main = async () => {
  await rc.authorize({
    jwt: process.env.RINGCENTRAL_JWT_TOKEN!,
  });
  const wsExtension = new WebSocketExtension();
  await rc.installExtension(wsExtension);
  // wsExtension.subscribe(['/restapi/v1.0/account/~/telephony/sessions?sipData=true'], (event) => {
  wsExtension.subscribe(['/restapi/v1.0/account/~/extension/~/telephony/sessions?sipData=true'], (event) => {
    console.log(JSON.stringify(event, null, 2));
  });
};
main();
