from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse

app = FastAPI()
 
import debugpy
debugpy.listen(("0.0.0.0", 5678))



@app.get("/")
async def read_root():
   
    return {"hello": "world"}