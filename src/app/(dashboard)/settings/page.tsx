import Button from "@/components/Button";
import Input from "@/components/Input";

const Page = () => {
  return (
    <section className="flex flex-col h-full">
      <h6 className="md:text-lg font-medium">Settings</h6>
      <div className="mt-4 lg:mt-6 flex flex-col divide-y divide-[#F0F2F5] gap-8 lg:gap-12">
        <div className="md:flex gap-4">
          <div className="lg:w-2/5 max-w-[300px]">
            <p className="font-medium">Profile photo</p>
            <small className="mt-1 text-grey-200">
              This image will be displayed on your profile
            </small>
          </div>
          <div className="lg:w-3/5 mt-4 md:mt-0">
            <img
              src="/avatar.svg"
              className="w-[120px] h-[120px]"
              alt="avatar icon"
            />
          </div>
        </div>
        <div className="lg:flex gap-4 pt-8 lg:pt-12">
          <div className="lg:w-2/5 max-w-[300px]">
            <p className="font-medium">Personal Information</p>
            <small className="mt-1 text-grey-200">
              Update your personal details here
            </small>
          </div>
          <form className="lg:w-3/5 flex flex-col gap-5 mt-4 lg:mt-0">
            <div className="grid grid-cols-2 gap-4">
              <Input label="First Name" />
              <Input label="Last Name" />
            </div>
            <Input label="Student Registration Number" />
            <Input label="Email address" type="email" />
            <Button type="submit" className="w-max">
              Save Changes
            </Button>
          </form>
        </div>
        <div className="lg:flex gap-4 pt-8 lg:pt-12">
          <div className="lg:w-2/5 max-w-[300px]">
            <p className="font-medium">Manage Password</p>
            <small className="mt-1 text-grey-200">Keep your account safe</small>
          </div>
          <form className="lg:w-3/5 flex flex-col gap-5 mt-4 lg:mt-0">
            <Input label="Password" type="password" />
            <Input label="Confirm Password" type="password" />
            <Button type="submit" className="w-max">
              Save Changes
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Page;
