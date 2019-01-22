import * as assert from 'assert';
import * as roleService from '../src/services/role.service';

describe("Role service tests", () => {
    it("can read a role",  (done) => {
        const roleId = 1
        roleService.readRole(roleId)
            .then((fetchedRole => {
                assert(fetchedRole.name === 'Admin');
                done();
            }))
    })
});