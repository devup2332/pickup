import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
	Button,
	CircularProgress,
	FormControl,
	FormHelperText,
	IconButton,
	InputAdornment,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Select,
	useTheme,
} from '@mui/material';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { IconGoogleColor } from '../../components/atoms/icons';
import patterns from '../../utils/patterns';
import countryOptions from '../../utils/options/countryCode';
import Link from 'next/link';
import { useMutation } from '@apollo/client';
import { REGISTER_USER_MUTATION } from '../../graphql/services/users/queries';
import { signIn, useSession } from 'next-auth/react';
import { usersInstance } from '../../utils/api/services/users';

const RegisterPageContainer = () => {
	const { data: session } = useSession();
	const [registerUserMutation, { data, error, loading: loadingNewUser }] =
		useMutation(REGISTER_USER_MUTATION);
	const [countryCode, setCountryCode] = useState('51');
	const [showPass, setShowPass] = useState(false);
	const theme = useTheme();
	const {
		formState: { errors, touchedFields, dirtyFields },
		control,
		handleSubmit,
		watch,
		setValue,
	} = useForm();
	const { t } = useTranslation('global');
	const registerUser = async (data: any) => {
		const {
			email,
			password_1: password,
			countryCode,
			phone,
			firstName,
			lastName,
		} = data;
		const user = {
			email,
			password,
			phone: `${countryCode}${phone}`,
			lastName,
			firstName,
		};
		const res = await registerUserMutation({
			variables: {
				newUserInput: user,
			},
		});
		console.log({ res });
	};

	const registerWithGoogle = async () => {
		signIn('google');
	};
	const handleShowPass = () => {
		setShowPass(!showPass);
	};

	const handleError = (err: any) => {
		console.log({ err });
	};

	const validateEmail = async (email: string) => {
		const valid = await usersInstance.validateEmail(email);
		if (!valid) return false;
		return true;
	};

	useEffect(() => {
		setValue('countryCode', '51');
	}, []);

	return (
		<div className="flex h-screen">
			<Head>
				<title>Pickup - Register</title>
			</Head>
			<div className="w-4/12 bg-red-600">
				<img
					src="https://images.unsplash.com/photo-1661937303423-f251f4b80c8f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
					className="h-full block object-cover w-full"
					alt=""
				/>
			</div>
			<div className="w-8/12 flex justify-center items-center">
				<form
					onSubmit={handleSubmit(registerUser, handleError)}
					className="grid gap-8 grid-cols-11 w-8/12"
				>
					<div className="col-start-1 col-end-12 grid gap-8 items-center">
						<h1 className="text-5xl font-extrabold col-start-1 col-end-12">
							Sign Up
						</h1>
						<p className="flex gap-5">
							{t('signUp.signUpSubtitle')}
							<Link href="/login">
								<a className="font-bold">{t('signUp.signUpLink')}</a>
							</Link>
						</p>
						<Button
							variant="contained"
							className="font-extrabold text-md normal-case rounded-xl flex gap-5 col-start-6 col-end-12"
							type="button"
							onClick={registerWithGoogle}
							color="secondary"
							style={{
								height: '50px',
							}}
						>
							{t('signUp.signUpWithGoogle')}{' '}
							<IconGoogleColor className="w-7 h-7" />
						</Button>
					</div>
					<Controller
						name="email"
						control={control}
						rules={{
							required: true,
							pattern: new RegExp(patterns.email),
							validate: {
								validateEmail,
							},
						}}
						render={({ field }) => {
							return (
								<FormControl
									variant="outlined"
									{...field}
									className="col-start-1 col-end-12"
									error={errors.email && true}
								>
									<InputLabel>{t('signUp.email.label')}</InputLabel>
									<OutlinedInput label="Email" type="text" />
									{errors.email && (
										<FormHelperText>
											{errors.email.type === 'required' &&
												t('signUp.email.errors.required')}
											{errors.email.type === 'pattern' &&
												t('signUp.email.errors.invalid')}
											{errors.email.type === 'validateEmail' &&
												t('signUp.email.errors.isUsed')}
										</FormHelperText>
									)}
								</FormControl>
							);
						}}
					/>
					<Controller
						name="countryCode"
						control={control}
						render={({ field }) => {
							return (
								<FormControl
									variant="outlined"
									className="col-start-1 col-end-3"
									{...field}
								>
									<InputLabel id="countryCode-select">
										{t('signUp.countryCode.label')}
									</InputLabel>
									<Select
										labelId="countryCode-select"
										value={countryCode}
										label="Country Code"
										onChange={(e) => {
											setValue('countryCode', e.target.value as string);
											setCountryCode(e.target.value as string);
										}}
									>
										{countryOptions.map((opt, index) => (
											<MenuItem key={index} value={opt.value}>
												{opt.label}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							);
						}}
					/>
					<Controller
						name="phone"
						control={control}
						rules={{
							required: true,
							pattern: new RegExp(patterns.onlyNumbers),
						}}
						render={({ field }) => {
							return (
								<FormControl
									variant="outlined"
									{...field}
									className="col-start-3 col-end-12"
									error={errors.phone && true}
								>
									<InputLabel>{t('signUp.phone.label')}</InputLabel>
									<OutlinedInput
										label="Phone"
										type="number"
										className="appearance-none"
									/>
									{errors.phone && (
										<FormHelperText>
											{errors.phone && errors.phone.type === 'required'
												? t('signUp.phone.errors.required')
												: t('signUp.phone.errors.invalid')}
										</FormHelperText>
									)}
								</FormControl>
							);
						}}
					/>
					<Controller
						name="firstName"
						control={control}
						rules={{
							required: true,
						}}
						render={({ field }) => {
							return (
								<FormControl
									variant="outlined"
									error={errors?.firstName && true}
									className="col-start-1 col-end-6"
									{...field}
								>
									<InputLabel>{t('signUp.firstName.label')}</InputLabel>
									<OutlinedInput label="First Name" type="text" />
									{errors.firstName && (
										<FormHelperText>
											{t('signUp.firstName.errors.required')}
										</FormHelperText>
									)}
								</FormControl>
							);
						}}
					/>
					<Controller
						name="lastName"
						control={control}
						rules={{
							required: true,
						}}
						render={({ field }) => {
							return (
								<FormControl
									variant="outlined"
									{...field}
									className="col-start-6 col-end-12"
									error={errors?.lastName && true}
								>
									<InputLabel>{t('signUp.lastName.label')}</InputLabel>
									<OutlinedInput label="Last Name" type="text" />
									{errors.lastName && (
										<FormHelperText>
											{t('signUp.lastName.errors.required')}
										</FormHelperText>
									)}
								</FormControl>
							);
						}}
					/>
					<Controller
						name="password_1"
						control={control}
						rules={{
							required: true,
							minLength: 9,
							validate: {
								noEqual: (val) => {
									if (val !== watch('password_2')) return false;
									return true;
								},
							},
						}}
						render={({ field }) => {
							return (
								<FormControl
									variant="outlined"
									{...field}
									className="col-start-1 col-end-12"
									error={errors.password_1 && true}
								>
									<InputLabel>{t('signUp.password_1.label')}</InputLabel>
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
									{errors.password_1 && (
										<FormHelperText>
											{errors.password_1 &&
												errors.password_1.type === 'required' &&
												t('signUp.password_1.errors.required')}
											{errors.password_1.type === 'minLength' &&
												t('signUp.password_1.errors.minLength')}
											{errors.password_1.type === 'noEqual' &&
												t('signUp.password_1.errors.noEqual')}
										</FormHelperText>
									)}
								</FormControl>
							);
						}}
					/>
					<Controller
						name="password_2"
						control={control}
						rules={{
							required: true,
							minLength: 9,
						}}
						render={({ field }) => {
							return (
								<FormControl
									variant="outlined"
									{...field}
									className="col-start-1 col-end-12"
									error={errors.password_2 && true}
								>
									<InputLabel>{t('signUp.password_2.label')}</InputLabel>
									<OutlinedInput
										label="Repeat Password"
										type={showPass ? 'text' : 'password'}
										endAdornment={
											<InputAdornment position="end">
												<IconButton onClick={handleShowPass}>
													{!showPass ? <Visibility /> : <VisibilityOff />}
												</IconButton>
											</InputAdornment>
										}
									/>
									{errors.password_2 && (
										<FormHelperText>
											{errors.password_2 &&
											errors.password_2.type === 'required'
												? t('signUp.password_2.errors.required')
												: t('signUp.password_2.errors.minLength')}
										</FormHelperText>
									)}
								</FormControl>
							);
						}}
					/>
					<Button
						variant="contained"
						className="font-bold flex gap-5 text-md normal-case rounded-xl col-start-1 col-end-12"
						type="submit"
						style={{
							backgroundColor: `${theme.palette.primary.main}`,
							height: '50px',
						}}
					>
						{loadingNewUser && (
							<CircularProgress
								sx={{ width: '20px' }}
								size="2rem"
								className="w-3 h-3 block"
								color="secondary"
							/>
						)}
						{t('signUp.signUpButton')}
					</Button>
				</form>
			</div>
		</div>
	);
};
export default RegisterPageContainer;
