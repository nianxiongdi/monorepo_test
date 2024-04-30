const axios =  require('axios')


module.exports = class WebpackReloadPlugin {
  constructor() {
  } 
  apply(compiler) {
    compiler.hooks.afterEmit.tap(
      'afterEmit',
      () => {
        setTimeout(() => {
          axios.get('http://127.0.0.1:8081/reload').then(function(response){
            console.log('>>> success 123');
          }).catch(function(response){
            console.log('>>> err');
          })
        }, 20)
      }
    );
  }
}
