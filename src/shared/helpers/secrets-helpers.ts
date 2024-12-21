import crypto from "crypto";

class SecretsHelper {
  public encrypt = (data: string) => {
    try {
      const publicKey = process.env.PEM_PUBLIC_KEY;
    
      if (!publicKey) throw Error("No public key");
  
      const encryptedData = crypto.publicEncrypt(
        {
            key: publicKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: 'sha256',
        },
        Buffer.from(data)
      );
    
      const encrypted = encryptedData.toString('base64'); // Convert to base64 for easier storage or transfer

      return encrypted;
    } catch (e) {
      console.log(`Failed to encrypt: ${e}`)
      throw e;
    }
  }
  
  public decrypt = (data?: string) => {
    try {
      if (!data) throw Error("no encrypted data");
  
      const privateKey = process.env.PEM_PRIVATE_KEY;
    
      if (!privateKey) throw Error("No private key");
  
      const decryptedData = crypto.privateDecrypt(
        {
          key: privateKey,
          padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
          oaepHash: 'sha256',
        },
        Buffer.from(data, 'base64') // Convert back from base64
      );
  
      return decryptedData.toString(); // Convert Buffer to string
    } catch (e) {
      console.log(`Failed to decrypt: ${e}`)
      throw e;
    }
  }
}

export default SecretsHelper;