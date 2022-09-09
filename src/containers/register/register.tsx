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
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { IconGoogleColor } from '../../components/atoms/icons';
import patterns from '../../utils/patterns';
import countryOptions from '../../utils/options/countryCode';

const RegisterPageContainer = () => {
	const [loading, setLoading] = useState(false);
	const [countryCode, setCountryCode] = useState('51');
	const [showPass, setShowPass] = useState(false);
	const theme = useTheme();
	const {
		formState: { errors },
		control,
		handleSubmit,
		watch,
		setValue,
	} = useForm();
	const { t } = useTranslation('global');
	const registerUser = (data: any) => {
		console.log({ data });
	};
	const handleShowPass = () => {
		setShowPass(!showPass);
	};

	const handleError = (err: any) => {
		console.log({ err });
	};

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
					<div className="col-start-1 col-end-12 grid gap-8">
						<h1 className="text-4xl font-bold col-start-1 col-end-12">
							Sign Up
						</h1>
						<p className="flex gap-5">
							{t('signUp.signUpSubtitle')}
							<a href="">{t('signUp.signUpLink')}</a>
						</p>
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
					</div>
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
									{...field}
									className="col-start-1 col-end-12"
									error={errors.email && true}
								>
									<InputLabel>{t('signUp.email.label')}</InputLabel>
									<OutlinedInput label="Email" type="text" />
									{errors.email && (
										<FormHelperText>
											{errors.email && errors.email.type === 'required'
												? t('signUp.email.errors.required')
												: t('signUp.email.errors.invalid')}
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
									<OutlinedInput label="Phone" type="text" />
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
				</form>
			</div>
		</div>
	);
};
export default RegisterPageContainer;
