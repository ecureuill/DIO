# Postman

A coleção foi organizada com pastas para que eu pudesse reaproveitar testes.

![image](https://user-images.githubusercontent.com/993369/204679242-85a74dac-0640-446d-9e37-467ac18910fc.png)

Como solução para para as requisições que tem como pre-condição a existência de um resgistro, utilizei o script abaixo para criar um registro e salvar seu id nas variáveis da collection. Desta forma, não importa a ordem da execução pois o script garantirá pre-condição

```java
if(pm.collectionVariables.get('res_bookingid') === -1){
    console.info("sendind request");
    pm.sendRequest(pm.collectionVariables.get("reqCreatBooling"), function (err, res) {
        const responseJson = res.json();
        console.log(responseJson);
        pm.collectionVariables.set("res_bookingid", responseJson.bookingid);
        console.log(pm.collectionVariables.get('res_bookingid'));
    });
}
``` 

![image](https://user-images.githubusercontent.com/993369/204679391-bcd2a84a-99a3-4c25-bcd1-fff6fe87d714.png)
