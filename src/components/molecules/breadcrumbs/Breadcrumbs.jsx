"use client";
import styles from "./Breadcrumbs.module.scss";
import { useRouter } from "next/navigation";
import Text from "@/components/atoms/text/Text";

const Breadcrumbs = ({ steps }) => {
  const router = useRouter();
  return (
    <nav className={styles.breadcrumbs}>
      <ol className={styles.breadcrumbs__container}>
        <li className={styles.step}>
          <button className={styles.mainButton} onClick={() => router.back()}>
            <Text
              text={`Volver al listado`}
              size="xsmall"
              weight="regular"
              color="active-color"
            />
          </button>
        </li>
        <span className={styles.separator}> | </span>

        {steps.map((step, index) => (
          <li key={index} className={styles.step}>
            {index < steps.length - 1 ? (
              <div className={styles.step__container}>
                <Text
                  text={step.label}
                  size="xsmall"
                  weight="regular"
                  color="secondary-color"
                />
                <span className={styles.separator}> {`>`} </span>
              </div>
            ) : (
              <span>{step.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
