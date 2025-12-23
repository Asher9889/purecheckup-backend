import { StatusCodes } from "http-status-codes";
import { Role } from "../../models";
import { ApiErrorResponse } from "../../utils";
import { RoleService } from "../../domain";

const roles = [
    {
        name: "Super Admin",
        role: "SUPER_ADMIN",
        description: "Full access to all system resources, including managing admins, doctors, and blog content.",
        permissions: ["*"], // wildcard means unrestricted access
        isSystemRole: true,
    },
    {
        name: "Admin",
        role: "ADMIN",
        description: "Administrative privileges for managing blogs, doctors, and patient data.",
        permissions: [
            "blog:create",
            "blog:update",
            "blog:delete",
            "blog:view",
            "doctor:view",
            "patient:view",
        ],
        isSystemRole: true,
    },
    {
        name: "Editor",
        role: "EDITOR",
        description: "Can create and edit blog content but cannot manage users.",
        permissions: ["blog:create", "blog:update", "blog:view"],
        isSystemRole: true,
    },
    {
        name: "Doctor",
        role: "DOCTOR",
        description: "Doctor with access to patient records and schedules.",
        permissions: ["patient:view", "patient:update", "appointment:view"],
        isSystemRole: true,
    },
    {
        name: "Patient",
        role: "PATIENT",
        description: "Basic user with access to their profile and blog reading privileges.",
        permissions: ["blog:view", "profile:view", "profile:update"],
        isSystemRole: true,
    },
];

async function seedRoles() {
    try {
        const roleService = new RoleService();
        const allRolesData = await roleService.findAll();
        const existingRoleNames = new Set(allRolesData.map((role) => role.name));
        const rolesToInsert = roles.filter((role) => !existingRoleNames.has(role.name));

        if (rolesToInsert.length === 0) {
            return console.log("ℹ️ All roles already exist.");
        }
        await roleService.bulkCreate(rolesToInsert);
        console.log(`✅ Created ${rolesToInsert.length} new role(s).`);

    } catch (error: any) {
        throw new ApiErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, error.message)
    }
}

export default seedRoles;
