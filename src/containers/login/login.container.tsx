import OutlinedInput from '@mui/material/OutlinedInput';
import Head from 'next/head';
import Button from '@mui/material/Button';
import patterns from '../../utils/patterns/index';
import {
	CircularProgress,
	FormControl,
	FormHelperText,
	IconButton,
	InputAdornment,
	InputLabel,
	useTheme,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { IconGoogleColor } from '../../components/atoms/icons';
import { useTranslation } from 'react-i18next';
import { usersInstance } from '../../utils/api/services/users';

const LoginContainer = () => {
	const [showPass, setShowPass] = useState(false);
	const [loading, setLoading] = useState(false);
	const { t } = useTranslation('global');
	const theme = useTheme();
	const {
		formState: { errors },
		control,
		handleSubmit,
	} = useForm();
	const handleShowPass = () => {
		setShowPass(!showPass);
	};

	const loginUser = async (data: any) => {
		try {
			setLoading(true);
			const { email, password } = data;
			const res = await usersInstance.loginUser(email, password);
			console.log({ res });
			setLoading(false);
			console.log({ res });
		} catch (e) {
			console.log({ e });
			setLoading(false);
		}
	};

	const loginError = (error: any) => {
		console.log({ error });
	};
	return (
		<div className="flex w-screen h-screen justify-center items-center">
			<Head>
				<title>Pickup - Login</title>
			</Head>
			<div className="w-full lg:w-5/12  flex justify-center items-center 2xl:w-3/12">
				<form
					onSubmit={handleSubmit(loginUser, loginError)}
					className="grid gap-7 w-9/12 md:w-6/12 lg:w-9/12"
				>
					<h1 className="text-4xl font-bold">{t('signIn.signInTitle')}</h1>
					<Controller
						name="email"
						control={control}
						rules={{
							required: true,
							pattern: new RegExp(patterns.email),
						}}
						render={({ field }) => {
							return (
								<FormControl
									variant="outlined"
									error={errors?.email && true}
									{...field}
								>
									<InputLabel>{t('signIn.signInEmailFieldLabel')}</InputLabel>
									<OutlinedInput label="Email" type="text" />
									{errors.email && (
										<FormHelperText>
											{errors.email && errors.email.type === 'required'
												? t('signIn.signInEmailFieldError.required')
												: t('signIn.signInEmailFieldError.invalid')}
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
							required: true,
						}}
						render={({ field }) => (
							<FormControl
								variant="outlined"
								error={errors.password && true}
								{...field}
							>
								<InputLabel>{t('signIn.signInPasswordFieldLabel')}</InputLabel>
								<OutlinedInput
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
										{t('signIn.signInPasswordFieldError') as string}
									</FormHelperText>
								)}
							</FormControl>
						)}
					/>
					<Button
						variant="contained"
						className="font-bold flex gap-5 text-md normal-case rounded-xl"
						type="submit"
						style={{
							backgroundColor: `${theme.palette.primary.main}`,
							height: '50px',
						}}
					>
						{loading && (
							<CircularProgress
								sx={{ width: '20px' }}
								size="2rem"
								className="w-3 h-3 block"
								color="secondary"
							/>
						)}
						{t('signIn.signInButton')}
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
						{t('signIn.signInWithGoogle')}{' '}
						<IconGoogleColor className="w-7 h-7" />
					</Button>
					<a
						className="text-blue-900 font-bold"
						href="https://google.com"
						target="_blank"
						rel="noreferrer"
					>
						{t('signIn.signInForgotPasswordLinkText')}
					</a>
				</form>
			</div>
			<div className="w-7/12 h-full relative hidden lg:block 2xl:w-9/12">
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
