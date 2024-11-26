interface ServerResponse<T> {
	data: T;
}

interface ServerErrorResponse {
	message: string;
	code: string;
}

type AsyncFunction<T> = (...args: any[]) => Promise<T>;

type CatchAsyncReturn<T extends AsyncFunction<any>> = (
	...args: Parameters<T>
) => Promise<ReturnType<T> | void>;
