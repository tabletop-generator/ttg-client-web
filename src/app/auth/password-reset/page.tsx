import PasswordResetForm from "@/components/password-reset-form";

export default function PasswordResetPage() {
  return (
    <div className="flex grow items-center justify-center">
      <div className="bg-base-100 border-base-300 rounded-box w-full max-w-md border p-6">
        <PasswordResetForm />
      </div>
    </div>
  );
}
