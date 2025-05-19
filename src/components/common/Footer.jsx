import { useEffect, useState } from 'react';

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <>
      <footer className="mt-5 py-4 footer">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <p className="mb-0 text-muted">
                Copyright &copy; {currentYear} Jun | 版權所有
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}