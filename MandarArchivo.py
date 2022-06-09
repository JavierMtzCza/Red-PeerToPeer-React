import paramiko

ssh = paramiko.SSHClient()

ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect(hostname="",username="",password="",port=22)

sftp_client = ssh.open_sftp();

sftp_client.put("nombre archivo", "ruta y nombre de archivo")
sftp_client.close()
ssh.close()