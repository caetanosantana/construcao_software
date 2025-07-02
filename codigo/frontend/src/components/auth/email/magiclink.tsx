import { Theme } from "@auth/core/types";

interface MagicLinkProps {
  url: string;
  host: string;
  theme: Theme;
}

// FIXME: Implementar i18n talvez?
const EMAIL_TEXT = {
  signInTo: "Entrar em ",
  signIn: "Entrar",
  ignore: "Se você não solicitou este e-mail, pode ignorá-lo com segurança.",
};

// i want to create a simple function to handle translations and pass the key from the text like t`signInTo`
const t = (strings: TemplateStringsArray, ...values: string[]) => {
  return strings.reduce((result, str, i) => {
    return result + str + (values[i] || "");
  }, "");
}

export function MagicLinkTemplate({ url, host, theme }: MagicLinkProps) {
  const escapedHost = host.replace(/\./g, "&#8203;.");

  const brandColor = theme.brandColor || "#346df1";
  const color = {
    background: "#f9f9f9",
    text: "#444",
    mainBackground: "#fff",
    buttonBackground: brandColor,
    buttonBorder: brandColor,
    buttonText: theme.buttonText || "#fff",
  };
  return (
    <body style={{ background: color.background }}>
      <table
        width="100%"
        border={0}
        cellSpacing="20"
        cellPadding="0"
        style={{
          background: color.mainBackground,
          maxWidth: "600px",
          margin: "auto",
          borderRadius: "10px",
        }}
      >
        <tr>
          <td
            align="center"
            style={{
              padding: "10px 0px",
              fontSize: "22px",
              fontFamily: "Helvetica, Arial, sans-serif",
              color: color.text,
            }}
          >
            {t`signInTo`}
            <strong>{escapedHost}</strong>
          </td>
        </tr>
        <tr>
          <td align="center" style={{ padding: "20px 0" }}>
            <table border={0} cellSpacing="0" cellPadding="0">
              <tr>
                <td
                  align="center"
                  style={{
                    borderRadius: "5px",
                    backgroundColor: color.buttonBackground,
                  }}
                >
                  <a
                    href={url}
                    target="_blank"
                    style={{
                      fontSize: "18px",
                      fontFamily: "Helvetica, Arial, sans-serif",
                      color: color.buttonText,
                      textDecoration: "none",
                      borderRadius: "5px",
                      padding: "10px 20px",
                      border: `1px solid ${color.buttonBorder}`,
                      display: "inline-block",
                      fontWeight: "bold",
                    }}
                  >
                    {t`signIn`}
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td
            align="center"
            style={{
              padding: "0px 0px 10px 0px",
              fontSize: "16px",
              lineHeight: "22px",
              fontFamily: "Helvetica, Arial, sans-serif",
              color: color.text,
            }}
          >
            {t`ignore`}
          </td>
        </tr>
      </table>
    </body>
  );
}

export function MagicLinkText({ url, host }: { url: string; host: string }) {
  const escapedHost = host.replace(/\./g, "&#8203;.");
  return `${EMAIL_TEXT.signInTo}${escapedHost}\n\nClique no link abaixo para entrar:\n\n${url}\n\n${EMAIL_TEXT.ignore}`;
}
