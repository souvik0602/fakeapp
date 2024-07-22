from fastapi import FastAPI,Request, Response
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
import os
import httpx
import uvicorn
app = FastAPI()

# Mount the static directory to serve static files
app.mount("/static", StaticFiles(directory="static"), name="static")

# Serve the index.html file at the root URL
@app.get("/", response_class=HTMLResponse)
async def read_index():
    index_path = os.path.join("static", "index.html")
    with open(index_path, 'r') as file:
        content = file.read()
    return HTMLResponse(content=content)


async def forward_request(url: str, request: Request):
    async with httpx.AsyncClient() as client:
        headers = dict(request.headers)
        body = await request.body()
        response = await client.request(request.method, url, headers=headers, content=body)
        return Response(content=response.content, status_code=response.status_code, headers=response.headers)

@app.post("/proxy/upload-img-forge/")
async def proxy_upload_img_forge(request: Request):
    return await forward_request("http://10.240.12.205:8002/upload-img-forge/", request)

@app.post("/proxy/upload-img-df/")
async def proxy_upload_img_df(request: Request):
    return await forward_request("http://10.240.12.205:8001/upload-img-df/", request)

@app.post("/proxy/upload_image/")
async def proxy_upload_image(request: Request):
    return await forward_request("http://10.240.12.80:8000/upload_image", request)


if __name__ == "__main__":

    uvicorn.run(app, host="0.0.0.0", port=8000)