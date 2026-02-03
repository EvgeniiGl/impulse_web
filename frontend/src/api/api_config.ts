export interface IApiConfiguration {
    url: string,
    timeout: number,
    contentType: string,
    accessToken: string,
}

export const config: IApiConfiguration = {
    url: '',
    timeout: 10000,
    contentType: "application/json",
    accessToken: "",
}

export type HttpHeaders = {
    [key: string]: string;
};

export type AxiosRequestConfig = {
    headers: HttpHeaders;
};