import PasswordResetForm from "@/components/password-reset-form";

export default async function PasswordResetPage() {
  return (
    <div className="flex grow items-center justify-center">
      <div className="m-6 w-96">
        <div className="bg-base-100 border-base-300 p-6">
          <PasswordResetForm />
        </div>
      </div>
    </div>
  );
}
