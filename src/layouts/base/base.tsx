interface BaseProps {
	children: JSX.Element;
}

const Base = ({ children }: BaseProps) => {
	return <div>{children}</div>;
};

export default Base;
