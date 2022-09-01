import OutlinedInput from '@mui/material/OutlinedInput';
import Head from 'next/head';
import Button from '@mui/material/Button';
import {
	FormControl,
	FormHelperText,
	IconButton,
	InputAdornment,
	InputLabel,
	useTheme,
} from '@mui/material';
import { Google, Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { IconGoogleColor } from '../../components/atoms/icons';

const LoginContainer = () => {
	const [showPass, setShowPass] = useState(false);
	const theme = useTheme();
	const {
		formState: { errors },
		control,
		handleSubmit,
	} = useForm();
	const handleShowPass = () => {
		setShowPass(!showPass);
	};

	const loginUser = (data: any) => {
		console.log({ data: true });
	};

	const loginError = (error: any) => {
		console.log({ error });
	};
	return (
		<div className="flex max-h-screen">
			<div className="container"></div>
			<Head>
				<title>Pickup - Login</title>
			</Head>
			<div className="w-3/12 flex justify-center items-center">
				<form
					onSubmit={handleSubmit(loginUser, loginError)}
					className="grid gap-7 w-9/12"
				>
					<h1 className="text-4xl font-bold">Sign In</h1>
					<Controller
						name="email"
						control={control}
						rules={{
							required: {
								message: 'Email is required',
								value: true,
							},
						}}
						render={({ field }) => {
							return (
								<FormControl
									variant="outlined"
									error={errors?.email && true}
									{...field}
								>
									<InputLabel>Email</InputLabel>
									<OutlinedInput
										id="outlined-basic"
										label="Email"
										type="text"
									/>
									{errors.email && (
										<FormHelperText>
											{errors.email?.message as string}
										</FormHelperText>
									)}
								</FormControl>
							);
						}}
					/>
					<Controller
						name="password"
						control={control}
						rules={{
							required: {
								message: 'Password is required',
								value: true,
							},
						}}
						render={({ field }) => (
							<FormControl
								variant="outlined"
								error={errors.password && true}
								{...field}
							>
								<InputLabel>Password</InputLabel>
								<OutlinedInput
									id="outlined-basic"
									label="Password"
									type={showPass ? 'text' : 'password'}
									endAdornment={
										<InputAdornment position="end">
											<IconButton onClick={handleShowPass}>
												{!showPass ? <Visibility /> : <VisibilityOff />}
											</IconButton>
										</InputAdornment>
									}
								/>
								{errors.password && (
									<FormHelperText>
										{errors.password?.message as string}
									</FormHelperText>
								)}
							</FormControl>
						)}
					/>
					<Button
						variant="contained"
						className="font-bold text-md normal-case rounded-xl"
						type="submit"
						style={{
							backgroundColor: `${theme.palette.primary.main}`,
							height: '50px',
						}}
					>
						Sign in
					</Button>
					<Button
						variant="contained"
						className="font-extrabold text-md normal-case rounded-xl flex gap-5"
						type="button"
						color="secondary"
						style={{
							height: '50px',
						}}
					>
						Sign in with Google <IconGoogleColor className="w-7 h-7" />
					</Button>
					<a
						className="text-blue-900 font-bold"
						href="https://google.com"
						target="_blank"
						rel="noreferrer"
					>
						Forgot your password ?
					</a>
				</form>
			</div>
			<div className="w-9/12 relative">
				<div className="bg-bg-black-rgba-0.5 absolute w-full h-full top-0 left-0"></div>
				<img
					className="w-full h-full object-cover block"
					src="https://images.unsplash.com/photo-1661937303423-f251f4b80c8f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
					alt=""
				/>
			</div>
		</div>
	);
};

export default LoginContainer;
