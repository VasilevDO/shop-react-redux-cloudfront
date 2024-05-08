const generateResponse = (principalId: string, effect: 'Deny' | 'Allow', resource: string) => ({
  principalId,
  policyDocument: {
      Version: '2012-10-17',
      Statement: [
          {
              Action: 'execute-api:Invoke',
              Effect: effect,
              Resource: resource,
          },
      ],
  },
})

export const main = async (event) => {
  const {headers, methodArn} = event;
  const authToken = headers.Authorization?.split(' ')[1] || ''

  if (!authToken) {
    throw new Error("Unauthorized")
  }

  const decodedToken = authToken && Buffer.from(authToken, 'base64').toString('utf-8')
  const [tokenKey, tokenValue] = decodedToken?.split(':')
  const principalId = 'test';
  const response = generateResponse(principalId,  (process.env[tokenKey] && tokenValue === process.env[tokenKey]) ? 'Allow' : 'Deny', methodArn);
  
  return response
};
