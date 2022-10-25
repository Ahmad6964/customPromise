class myPromise{
    constructor(handlerFun){
        this.state = "pending"
        this.value = null

        const resolve = (result) => {
            if(this.state === "pending"){
                this.state = "fulfilled"
                this.value = result
            }
        }

        const reject = (result)=> {
            if(this.state === "pending"){
                this.state = "rejected"
                this.value = result
            }
        }
            handlerFun(resolve , reject);

            this.then = function(succesCb){
                if(this.state === "fulfilled"){
                    succesCb(this.value);
                }
            }

            this.catch = function(failureCb){
                if(this.state === "rejected"){
                    failureCb(this.value);
                }
            }
       
    }
}

// Code Testing
const test1 = new myPromise((resolve,reject)=>{
    resolve("resolved");
});
const test2 = new myPromise((resolve , reject)=>{
    reject("rejected")
})

test1.then((res)=>{
    console.log(res);
})
test1.catch((err)=>{
    console.log(err)
})

test2.then((res)=>{
    console.log(res);
})
test2.catch((err)=>{
    console.log(err);
})
