import React from 'react'
import { Formik, Form } from 'formik'
import useUpdateProfile from '@/hooks/profile/useUpdateProfile'
import Button from '@/components/button'
import ProfileInput from './profile-input'

interface UpdateFormProps {
  setIsUpdateProfile: React.Dispatch<React.SetStateAction<boolean>>
}

export default function UpdateForm({
  setIsUpdateProfile
}: UpdateFormProps): React.ReactNode {
  const { initialValues, onSubmit } = useUpdateProfile()

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, formikHelpers) =>
        onSubmit(values, {
          ...formikHelpers,
          callback: () => setIsUpdateProfile(false)
        })
      }
    >
      {({ isSubmitting }) => (
        <Form>
          <ProfileInput
            type="text"
            name="fullName"
            className="mb-3 font-bold text-3xl"
          />

          <ProfileInput
            type="text"
            name="location"
            className="mb-5 font-bold text-gray-70"
          />

          <ProfileInput
            type="text"
            name="biography"
            className="mt-2 mb-6 text-gray-70 font-medium"
          />

          {isSubmitting ? (
            <Button
              isDisabled
              className="w-[178px] bg-white border border-gray-50 text-gray-50 text-heading-5 hover:border-blue-100 hover:text-blue-100"
            >
              Saving Changes...
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-[178px] bg-white border border-gray-50 text-gray-50 text-heading-5 hover:border-blue-100 hover:text-blue-100"
            >
              Save Changes
            </Button>
          )}
        </Form>
      )}
    </Formik>
  )
}
