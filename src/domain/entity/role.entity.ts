import { Role } from "../../models/index";

interface CreateRoleDTO {
  name: string;
  description: string;
  permissions: string[];
  isSystemRole?: boolean;
}

export default class RoleService {
  async findAll() {
    return Role.find({ name: 1 }).lean();
  }

  async findByName(name: string) {
    return Role.findOne({ name }, { name: 1 }).lean();
  }

  async createRole(data: CreateRoleDTO) {
    const exists = await Role.findOne({ name: data.name });
    if (exists) {
      throw new Error(`Role "${data.name}" already exists`);
    }

    const role = new Role(data);
    await role.save();
    return role;
  }

  async bulkCreate(roles: CreateRoleDTO[]) {

    const existingRoles = await Role.find({}, { name: 1 }).lean();
    const existingRoleNames = new Set(existingRoles.map((role) => role.name));

    const rolesToInsert = roles.filter((role) => !existingRoleNames.has(role.name));

    if (rolesToInsert.length === 0) {
      return console.log("ℹ️ All roles already exist.");
    }

    await Role.insertMany(rolesToInsert);
    console.log(`✅ Created ${rolesToInsert.length} new role(s).`);
  }

  async hasPermission(roleId: string, permission: string): Promise<boolean> {
    // Fetch role permissions only
    const role = await Role.findById(roleId, { permissions: 1 }).lean();

    if (!role || !Array.isArray(role.permissions)) {
      return false;
    }

    const { permissions: rolePermissions } = role;

    // Exact match first
    if (rolePermissions.includes(permission)) {
      return true;
    }

    // Wildcard match (e.g., "blog:*" should match "blog:create")
    return rolePermissions.some((perm) => this.matchesWildcard(perm, permission));


  }
  private matchesWildcard(rolePerm: string, targetPerm: string): boolean {
    if (!rolePerm.endsWith(":*")) return false;

    const [prefix] = rolePerm.split(":");
    return targetPerm.startsWith(`${prefix}:`);
  }
}
