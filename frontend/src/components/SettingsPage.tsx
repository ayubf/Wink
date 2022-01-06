import DeleteUserForm from "./subcomponents/DeleteUserForm";
import TopBar from "./subcomponents/TopBar";
import UpdateUserForm from "./subcomponents/UpdateUserForm";

function SettingsPage() {



    return (
        <div>
            <TopBar />
            <h1>Settings Page</h1>
            <UpdateUserForm />
            <DeleteUserForm />
        </div>
    )
}

export default SettingsPage;