'use strict';

import * as EASClientID from 'expo-eas-client-id';

export const name = 'EASClientID';

export async function test(t) {
  t.describe('EASClientID', () => {
    t.it('gets the EAS client ID', () => {
      const clientId = EASClientID.clientID;
      t.expect(clientId).toBeTruthy();
      const clientId2 = EASClientID.clientID;
      t.expect(clientId).toEqual(clientId2);
    });
  });
}
