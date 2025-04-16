import { Images } from '@/assets/images'
import { Button, FormInput, Image, Typography } from '@/components/atoms'
import { ILoginFormProps } from '@/types/molecules'
import { loginSchema, TLoginFormValues } from '@/types/schema'
import { Box } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { JSX } from 'react'
import { useForm } from 'react-hook-form'

/**
 * @description LoginForm component
 * @param {(data: TLoginFormValues) => void} onSubmit - Function to handle form submission
 * @param {string} formId - Optional form ID for the form element
 * @param {string} authenticationError - Optional error message for authentication
 */
const LoginForm: React.FC<ILoginFormProps> = ({
  onSubmit,
  formId,
  authenticationError
}): JSX.Element => {
  // -------------- REACT HOOK FORM
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<TLoginFormValues>({
    resolver: zodResolver(loginSchema)
  })

  return (
    <Box
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      width={350}
      height={425}
      className="bg-white rounded-lg p-5 flex flex-col justify-center items-center gap-3"
      data-testid="login-form"
    >
      <Image src={Images.Logo} alt="Logo" htmlWidth={75} htmlHeight={75} />
      {/* USERNAME BOX (this should be a component like FormInput) */}
      <FormInput
        id="username"
        label="username"
        placeholder="Enter your username"
        error={errors.username?.message}
        register={register('username')}
        dataTestId="user-email"
        dataTestIdError="user-email-error"
      />
      <FormInput
        id="password"
        label="password"
        type="password"
        placeholder="Enter your password"
        error={errors.password?.message}
        register={register('password')}
        dataTestId="user-password"
        dataTestIdError="user-password-error"
      />
      {/* SUBMIT BUTTON */}
      <Button
        className="w-full mt-2 relative"
        variant="primary"
        buttonType="submit"
        isLoading={isSubmitting}
        formId={formId}
        dataTestId="login-button"
      >
        <Typography
          textId="login-button"
          tagAs="span"
          text="Login"
          textColor="text-primary_black_500"
          className="mt-1"
          weight="regular"
        />
        {authenticationError && (
          <Typography
            textId="login-error"
            tagAs="span"
            text={authenticationError}
            textColor="text-red-500"
            className="absolute left-0 right-0 inset-x-0 -bottom-8"
            weight="regular"
            dataTestId="login-error-message"
          />
        )}
      </Button>
    </Box>
  )
}

export default LoginForm
