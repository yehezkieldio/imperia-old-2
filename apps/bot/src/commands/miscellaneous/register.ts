import { db, usersTable } from "@imperia/database";
import { ImperiaCommand } from "@imperia/discord-bot";
import { RegisterBehavior } from "@sapphire/framework";
import { SlashCommandBuilder } from "discord.js";
import { eq } from "drizzle-orm";

export class RegisterCommand extends ImperiaCommand {
    public constructor(context: ImperiaCommand.Context, options: ImperiaCommand.Options) {
        super(context, {
            name: "register",
            description: "Regiters and syncs your account with Imperia.",
            requiredClientPermissions: ["SendMessages"],
            ...options,
        });
    }

    public override registerApplicationCommands(registry: ImperiaCommand.Registry) {
        const command = new SlashCommandBuilder().setName(this.name).setDescription(this.description);

        void registry.registerChatInputCommand(command, {
            behaviorWhenNotIdentical: RegisterBehavior.Overwrite,
            guildIds: [],
            idHints: [],
        });
    }

    public async chatInputRun(interaction: ImperiaCommand.ChatInputCommandInteraction) {
        await interaction.deferReply();

        const userQuery = await db.select().from(usersTable).where(eq(usersTable.discordId, interaction.user.id));
        if (userQuery.length > 0) {
            return interaction.editReply({
                content: "You are already registered.",
            });
        }

        return interaction.reply({
            content: "This command is not yet implemented.",
        });
    }
}