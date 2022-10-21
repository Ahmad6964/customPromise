const PANDING = 0
const FULFILLED = 1
const REJECTED = 2

function customPromise (executor){
    let state = PANDING
    let value = null
    let handlers = []
    let catchers = []


    function resolve(result){
        if(state!== PANDING) return;


        state = FULFILLED
        value = result

        handlers.forEach((h)=> h(value))
    }

    function reject(err){
        if(state !== PANDING) return;

        state = REJECTED
        value = err

        catchers.forEach((c)=> c(value))
    }

    this.then = function(successCallback){
        if(state === FULFILLED){
            successCallback(value)
        }else{
            handlers.push(successCallback)
        }
    }

    this.catch = function(failureCallback){
        if(state === REJECTED){
            failureCallback(value)
        }else{
            catchers.push(failureCallback)
        }
    }

    executor(resolve , reject);

}

const doWork = (res , rej)=>{
    if(2==1){
        setTimeout(()=>{
           res('Promise Resolved Hello')
        }, 1000)
    }else{
        setTimeout(()=>{
           rej('Promise Rejected Bye')
        }, 1000)
    }
}

let greetMsg = new customPromise(doWork)


greetMsg.then((val)=>{
    console.log("then log", val)
})

greetMsg.catch((val)=>{
    console.log("catch log", val)
});