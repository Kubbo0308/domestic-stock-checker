import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { SOCIAL_ACCOUNT } from "@/const";

const Footer = () => {
  return (
    <Card className="mt-12 p-8 backdrop-blur-sm bg-white/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">企業健康度チェッカー</h3>
            <p className="text-sm text-muted-foreground">
              企業の財務データを分析し、投資判断に役立つ情報を提供します。
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">リンク</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  to="/guide"
                  className="hover:text-primary transition-colors"
                >
                  使い方ガイド
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="hover:text-primary transition-colors"
                >
                  プライバシーポリシー
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="hover:text-primary transition-colors"
                >
                  利用規約
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">連絡先</h3>
            <div className="flex space-x-4">
              <a
                href={SOCIAL_ACCOUNT.GITHUB_URL}
                target="_blank"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="GitHub"
              >
                <FaGithub size={20} />
              </a>
              <a
                href={SOCIAL_ACCOUNT.X_URL}
                target="_blank"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <FaXTwitter size={20} />
              </a>
              <a
                href={SOCIAL_ACCOUNT.GMAIL_ADDRESS}
                target="_blank"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Email"
              >
                <IoIosMail size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} 企業健康度チェッカー. All rights
            reserved.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default Footer;
