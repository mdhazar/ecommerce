import type React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, type RouteProps } from "react-router-dom";
import type { RootState } from "../../../redux/store";

interface ProtectedRouteProps extends Omit<RouteProps, "component"> {
	children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
	children,
	...rest
}) => {
	const user = useSelector((state: RootState) => state.client.user);
	const isAuthenticated = user && user.token;

	return (
		<Route
			{...rest}
			render={({ location }) =>
				isAuthenticated ? (
					children
				) : (
					<Redirect
						to={{
							pathname: "/login",
							state: { from: location },
						}}
					/>
				)
			}
		/>
	);
};

export default ProtectedRoute;
