const xhr = new XMLHttpRequest();
//event listener is first and then you complete the action
xhr.addEventListener('load', () => {
  console.log(xhr.response);
})
xhr.open('GET', 'https://supersimplebackend.dev')//get means get info from backend second param is where to send msg
xhr.send();//asynchronous so we must wait for it;
