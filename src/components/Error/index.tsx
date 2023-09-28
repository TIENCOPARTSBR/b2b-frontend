import { ERROR, H2, P, Image } from "./style";

type ErrorProps = {
	error: string;
}

const Error = ({ error }: ErrorProps) => {
	return (
		<ERROR className={error ? 'visible' : ''}>
			<Image
				src="/icons/alert-error.svg"
				width="21"
				height="21"
				alt="icon error"
			/>
			<div>
				<H2>Error</H2>
				<P>{error}</P>
			</div>
		</ERROR>
	)
}

export default Error;