export declare class HomeEndpointUnitTest {
    host: string;
    "POST /home 200"(): void;
    "POST /home 400 - invalid body data"(): void;
    "GET /home/index.html 404"(): void;
    "PATCH /home 405"(): void;
    "DELETE /home 405"(): void;
    "GET /home 405"(): void;
}
