import { useLocation, useMatch } from "react-router-dom";
import AdminRoute from "../../common/AdminRoute";
import Container from "../../common/Container";
import { PageLeftRight } from "../../common/PageLeftRight";
import PrivateRoute from "../../common/PrivateRoute";
import AboutEmployee from "./AboutEmployee";
import AddNewEmployeeForm from "./AddNewEmployeeForm";
import LeftUsersListSection from "./LeftUsersListSection";
import useUsersList from "./useUsersList";

export default function UsersPage() {
  const location = useLocation();
  const pathnameMatch = useMatch(location.pathname);
  const { usersList, operations } = useUsersList();
  const isNewUserForm = pathnameMatch?.pathnameBase === "/users/new";
  return (
    <PrivateRoute>
      <AdminRoute>
        <Container>
          <PageLeftRight>
            <LeftUsersListSection usersList={usersList} />
            {isNewUserForm ? (
              <AddNewEmployeeForm addToUsersList={operations.addToUsersList} />
            ) : (
              <AboutEmployee
                removeUserFromList={operations.removeUserFromList}
              />
            )}
          </PageLeftRight>
        </Container>
      </AdminRoute>
    </PrivateRoute>
  );
}
