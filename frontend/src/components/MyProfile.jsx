const MyProfile = ({ authUser }) => (
  <div>
    <h1 className="text-xl font-bold mb-5">My Profile</h1>
    <div className="flex flex-col items-center gap-4">
      <Avatar className="h-24 w-24 cursor-pointer">
        <AvatarImage src={authUser?.profile?.profilePhoto} alt="profile" />
      </Avatar>
    </div>
    <p>Name: {authUser?.fullname}</p>
    <p>Email: {authUser?.email}</p>
    <p>Phone: {authUser?.phoneNumber}</p>
    {/* Add more profile details here */}
  </div>
);

export default MyProfile;
